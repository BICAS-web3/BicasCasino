import Head from 'next/head';
import { Header } from '@/widgets/header/index';

export default function Home() {
    return (
        <>
            <Head>
                <title>NFT Play | Home page</title>
            </Head>
            <Header />
            <main>
                {/* <div className='layout__content'>
					<GameCardsRow />
					<NFTCardsRow />
				</div> */}
            </main>
            {/* <Footer />
			<InvitesList />
			<GamesList />
			<ConnectWalletModal /> */}
        </>
    );
}