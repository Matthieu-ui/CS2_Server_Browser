
import './App.css'
import Main from './components/Main'
import Header from './components/Header'
import Aside from './components/Aside'
import UserSearch from './components/UserSearch'

// toggle aside
function App() {

  // <p className='text-accent p-4'>I'm baby irony polaroid pok pok hashtag. Shoreditch meggings kogi organic. Gluten-free tacos franzen, hoodie kickstarter letterpress kogi forage selvage chia gatekeep swag artisan. Cliche master cleanse mukbang jawn same humblebrag mlkshk jianbing ennui seitan selvage tofu cupping. Jianbing chambray selfies church-key bruh, sustainable distillery cred XOXO.</p>


  return (
    <div className="App">
      {/* Header */}

      <Header />


      <div className="flex flex-col md:flex-row h-screen">
        <main className="w-full bg-secondary h-auto">
            <div className="h-auto flex-col p-4 m-auto ">
              <UserSearch />
            </div>

        </main>
      
      </div>

    </div>
  )
}

export default App
