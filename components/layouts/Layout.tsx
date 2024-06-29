import Navbar from "./Navbar";
import Footer from "./Footer";

export default ({children}) => {
    return (
        <div>

            <Navbar/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>

    )
}
