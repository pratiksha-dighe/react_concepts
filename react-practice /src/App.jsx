import { useState } from 'react'
import BasicConcepts from './concepts/1-BasicConcepts'
import StateManagement from './concepts/2-StateManagement'
import EffectsAndSideEffects from './concepts/3-EffectsAndSideEffects'
import ComponentComposition from './concepts/4-ComponentComposition'
import FormHandling from './concepts/5-FormHandling'
import APIIntegration from './concepts/6-APIIntegration'
import CustomHooks from './concepts/7-CustomHooks'
import ContextAPI from './concepts/8-ContextAPI'
import Performance from './concepts/9-Performance'
import TaskFlow from './mini-project/TaskFlow'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('basics')

  const sections = {
    basics: { label: 'JSX & Components', component: BasicConcepts },
    state: { label: 'State Management', component: StateManagement },
    effects: { label: 'Effects & Side Effects', component: EffectsAndSideEffects },
    composition: { label: 'Component Composition', component: ComponentComposition },
    forms: { label: 'Form Handling', component: FormHandling },
    api: { label: 'API Integration', component: APIIntegration },
    hooks: { label: 'Custom Hooks', component: CustomHooks },
    context: { label: 'Context API', component: ContextAPI },
    performance: { label: 'Performance', component: Performance },
    project: { label: 'Mini Project', component: TaskFlow },
  }

  const CurrentComponent = sections[activeSection].component

  return (
    <div className="container">
      <h1 style={{ color: 'white', marginBottom: '20px' }}>🚀 React Learning Journey</h1>
      
      <nav className="nav">
        {Object.entries(sections).map(([key, section]) => (
          <button
            key={key}
            className={activeSection === key ? 'active' : ''}
            onClick={() => setActiveSection(key)}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <div className="content">
        <CurrentComponent />
      </div>
    </div>
  )
}

export default App