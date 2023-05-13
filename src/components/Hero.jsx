import { logo } from '../assets';

const Hero = () => {
  return (
    <header>
            <nav>
                <img src={logo} alt="logo" />
                
                <button
                    type="button"
                    onClick={() => window.open('https://github.com/FakeDoctor22')}>
                        GitHub
                </button>
            </nav>
    </header>
  )
}

export default Hero