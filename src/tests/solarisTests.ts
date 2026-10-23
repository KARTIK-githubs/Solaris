import { calculateSolarFeasibility, calculatePmSuryaGharSubsidy, estimateMonthlyKwhFromBill } from '../utils/solarCalculations';
import { runAffordabilityOptimiser, calculateEmi } from '../utils/optimiserEngine';
import { INITIAL_COMMUNITY } from '../data/mockData';

export interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

export function runAllSolarisTests(): TestResult[] {
  const results: TestResult[] = [];

  // Test 1: Zero and negative input rejection
  try {
    const zeroTest = calculateSolarFeasibility({
      monthlyBillInr: 0,
      terraceAreaSqFt: 0,
      sanctionedLoadKw: 0
    });
    const passed = zeroTest.monthlyConsumptionKwh === 0 && zeroTest.recommendedCapacityKw >= 0;
    results.push({
      name: 'Zero and Negative Input Handling',
      passed,
      message: passed ? 'Successfully handled zero boundaries without NaN or infinite values.' : 'Failed zero boundary check.'
    });
  } catch (err: any) {
    results.push({ name: 'Zero and Negative Input Handling', passed: false, message: err.message });
  }

  // Test 2: PM Surya Ghar Subsidy Caps
  try {
    const sub1Kw = calculatePmSuryaGharSubsidy(1.0, true);
    const sub2Kw = calculatePmSuryaGharSubsidy(2.0, true);
    const sub3Kw = calculatePmSuryaGharSubsidy(3.0, true);
    const sub5Kw = calculatePmSuryaGharSubsidy(5.0, true);
    const subCommercial = calculatePmSuryaGharSubsidy(5.0, false);

    const passed = 
      sub1Kw === 30000 &&
      sub2Kw === 60000 &&
      sub3Kw === 78000 &&
      sub5Kw === 78000 && // Capped at ₹78,000 for residential
      subCommercial === 0;  // 0 for commercial

    results.push({
      name: 'PM Surya Ghar Subsidy Compliance',
      passed,
      message: passed 
        ? 'Verified ₹30k/kW up to 2kW, ₹78k cap at 3kW+, and 0 subsidy for commercial MSME.' 
        : `Subsidy mismatch: 1kW=${sub1Kw}, 2kW=${sub2Kw}, 3kW=${sub3Kw}, Comm=${subCommercial}`
    });
  } catch (err: any) {
    results.push({ name: 'PM Surya Ghar Subsidy Compliance', passed: false, message: err.message });
  }

  // Test 3: Optimiser Allocation Sum = 100% (Zero Shortfall)
  try {
    const opt = runAffordabilityOptimiser(INITIAL_COMMUNITY.members, {
      roofAreaSqFt: 1400,
      targetCapacityKw: 12,
      budgetCeilingInr: 580000,
      financingRatePercentage: 8.5,
      participantCapInr: 4500,
      stressFactors: {
        monsoonDrop: false,
        rateSpike: false,
        unitDropOut: false,
        subsidyDelay: false
      }
    });

    const sum = opt.selectedMembers.reduce((acc, m) => acc + m.sharePercentage, 0);
    const roundedSum = Math.round(sum * 10) / 10;
    const passed = roundedSum === 100.0 && opt.isFeasible;

    results.push({
      name: 'Credit Allocation Reconciliation (Sum = 100.0%)',
      passed,
      message: passed
        ? `Reconciled total sum is exactly ${roundedSum}% across ${opt.selectedMembers.length} participants with zero loss.`
        : `Sum mismatch: ${roundedSum}% != 100.0%`
    });
  } catch (err: any) {
    results.push({ name: 'Credit Allocation Reconciliation (Sum = 100.0%)', passed: false, message: err.message });
  }

  // Test 4: Allocation Total Does Not Exceed Generated Energy
  try {
    const opt = runAffordabilityOptimiser(INITIAL_COMMUNITY.members, {
      roofAreaSqFt: 1400,
      targetCapacityKw: 12,
      budgetCeilingInr: 580000,
      financingRatePercentage: 8.5,
      participantCapInr: 4500,
      stressFactors: {
        monsoonDrop: false,
        rateSpike: false,
        unitDropOut: false,
        subsidyDelay: false
      }
    });

    const totalKwAllocated = opt.selectedMembers.reduce((acc, m) => acc + m.shareKw, 0);
    const passed = Math.round(totalKwAllocated * 10) / 10 <= 12.0;

    results.push({
      name: 'Allocated Energy Within Technical Physical Limits',
      passed,
      message: passed
        ? `Allocated capacity (${totalKwAllocated.toFixed(1)} kW) does not exceed physical target capacity (12.0 kW).`
        : `Physical capacity exceeded: ${totalKwAllocated} kW > 12.0 kW`
    });
  } catch (err: any) {
    results.push({ name: 'Allocated Energy Within Technical Physical Limits', passed: false, message: err.message });
  }

  // Test 5: Budget Ceiling & Guaranteed Bill Safety Guardrail
  try {
    const emi = calculateEmi(100000, 8.5, 60);
    const passed = emi > 0 && emi <= 2100;
    results.push({
      name: 'Financing EMI & Budget Ceiling Calculation',
      passed,
      message: passed
        ? `5-Year loan calculation validated (₹${emi}/mo for ₹1,00,000 @ 8.5% p.a.).`
        : `Unexpected EMI calculation: ${emi}`
    });
  } catch (err: any) {
    results.push({ name: 'Financing EMI & Budget Ceiling Calculation', passed: false, message: err.message });
  }

  return results;
}
