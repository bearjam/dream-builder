import SvgSplash from "src/vectors/SvgSplash"
import SvgUnique from "src/vectors/SvgUnique"
import SvgTheme from "src/vectors/SvgTheme"
import SvgProcess from "src/vectors/SvgProcess"
import css from "./index.module.css"
import Link from "components/Link"
import Footer from "components/Footer"

const IndexPage = () => {
  return (
    <div className={css.root}>
      <section>
        <SvgSplash />
      </section>
      <section className={css.navBoxes}>
        <Link href="/#about">
          <a>
            <div>
              <h2>About</h2>
            </div>
          </a>
        </Link>
        <Link href="/explore">
          <a>
            <div>
              <h2>Explore</h2>
            </div>
          </a>
        </Link>
        <Link href="/create">
          <a>
            <div>
              <h2>Create</h2>
            </div>
          </a>
        </Link>
      </section>
      <section id="about" className={css.main}>
        <div>
          <h1>What is the Dream Builder?</h1>
          <p>
            The Dream Builder is an online tool to create your own digital dream
            board. <br />
            <br />
            You can download your dream board to keep and, if you choose, share
            your dreams on the Dream Tapestry.
          </p>
        </div>
        <div>
          <h1>What is a dream board?</h1>
          <p>
            A dream board is a collage of images and text that represent your
            vision of the future.
          </p>
          <div className={css.dreamSq}>
            <div className="bg-pink">
              <SvgUnique />
              <div>
                <h3>Your dream board is unique to you</h3>
              </div>
            </div>
            <div className="bg-navy text-white">
              <SvgTheme />
              <div>
                <h3>It can be comprehensive or have a specific theme</h3>
              </div>
            </div>
            <div>
              <SvgProcess />
              <div>
                <h3>We devise our own process to conjure our dreams</h3>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1>About this project</h1>
          <p>
            The Dream Builder was created by Bearjam and commissioned by CIVIC
            SQUARE as part of the Dream Fund.
          </p>
          <div className={css.infobox}>
            <div>
              <h3>About Bearjam</h3>
              <p>
                Bearjam is a designer-developer duo based in the West Midlands,
                UK. <br /> We make websites and digital experiences.
              </p>
            </div>
            <div>
              <h3>About the Dream Fund</h3>
              <p>
                "The Dream Fund exists to unlock and resource the bold,
                creative, regenerative dreams that are inside us and move them
                into the everyday consciousness of many."
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default IndexPage
