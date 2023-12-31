#[test_only]
module YieldHarbor::staked_sui_tests {

    use sui::coin::{Self};
    use sui::sui::SUI;
    use YieldHarbor::staked_sui::{Self, StakedSui};
    use sui::test_scenario::{Self as test, next_tx, Scenario, ctx};

    #[test]
    public fun test_wrap_unwrap() {
        let scenario = scenario();
        test_wrap_unwrap_(&mut scenario);
        test::end(scenario);
    }

    #[test_only]
    fun test_wrap_unwrap_(test: &mut Scenario) {
        let addr1 = @0xA;
        
        next_tx(test, addr1);
        {
            let sui_token = coin::mint_for_testing<SUI>(100, ctx(test));
            staked_sui::wrap(100,&mut sui_token, ctx(test));
            coin::burn_for_testing(sui_token);
        };

        next_tx(test, addr1);
        {
            let staked_sui = test::take_from_sender<StakedSui>(test);
            staked_sui::unwrap(staked_sui, ctx(test));
        };

    }   

    fun scenario(): Scenario { test::begin(@0x1) }
}