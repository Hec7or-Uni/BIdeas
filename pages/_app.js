// Components
import Layout from '../components/Layout'

// Styles
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp
