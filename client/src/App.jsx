
import './App.css'
import Main from './components/Main'
import Header from './components/Header'
import Aside from './components/Aside'

// toggle aside
function App() {

  // <p className='text-accent p-4'>I'm baby irony polaroid pok pok hashtag. Shoreditch meggings kogi organic. Gluten-free tacos franzen, hoodie kickstarter letterpress kogi forage selvage chia gatekeep swag artisan. Cliche master cleanse mukbang jawn same humblebrag mlkshk jianbing ennui seitan selvage tofu cupping. Jianbing chambray selfies church-key bruh, sustainable distillery cred XOXO.</p>


  return (
    <div className="App">
    {/* Header */}
    
    <Header />


    <div className="flex flex-col md:flex-row">
    <aside className="w-full md:w-1/4 nm-convex-secondary-lg">
      <Aside/>
      <p className='text-accent p-4'>// this is where users will show</p>

    </aside>
    <main className="w-full md:w-3/4">
      <Main/>
    </main>
  </div>

    </div>
  )
}

export default App
