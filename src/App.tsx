import React, {FC} from 'react'
import './styles/App.css'
import './styles/globals.css'
import './styles/darkMode.css'
import { UnderMaintenance } from './pages/UnderMaintenance'

const App: FC = () => {
    // Return only the maintenance page - block all other functionality
    return <UnderMaintenance />
}

export default App
