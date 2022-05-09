import { Box, HStack, Spacer, Stack, Select, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper  } from '@chakra-ui/react'
import { FC, useState } from 'react'
import * as Web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { getATA, createATA, uint64 } from './utils'
import { kryptMint, ScroogeCoinMint, token_swap_state_account, swap_authority, pool_krypt_account, pool_scrooge_account, pool_mint, token_account_pool, fee_account } from "./const";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { DepositAllSchema } from '../models/Data'
import { TOKEN_SWAP_PROGRAM_ID } from './const'

export const DepositSingleTokenType: FC = (props: {
    onInputChange?: (val: number) => void;
    onMintChange?: (account: string) => void;
}) => {
    const [poolTokenAmount, setAmount] = useState(0)

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const deposit = new DepositAllSchema(poolTokenAmount, 100e9, 100e9)
        handleTransactionSubmit(deposit)
    }

    const handleTransactionSubmit = async (deposit: DepositAllSchema) => {
        if (!publicKey) {
            alert('Please connect your wallet!')
            return
        }
        /* 


            build deposit transaction here


        */

    }

    return (
        <Box
        p={4}
        display={{ md: "flex" }}
        maxWidth="32rem"
        margin={2}
        justifyContent="center">
      <form onSubmit={handleSubmit}>
      <div style={{ padding: "0px 10px 5px 7px" }}>
      <FormControl isRequired>
          <FormLabel color='gray.200'>
              Amount to deposit to Liquidity Pool
            </FormLabel>
        <NumberInput
          onChange={(valueString) => setAmount(parseInt(valueString))}
          style={{
            fontSize: 20,
          }}
          placeholder="0.00"
        >
            <NumberInputField id='amount' color='gray.400' />

        </NumberInput>
        <Button width="full" mt={4} type="submit">
            Deposit
        </Button>
        </FormControl>
      </div>
      </form>
    </Box>
    )
}