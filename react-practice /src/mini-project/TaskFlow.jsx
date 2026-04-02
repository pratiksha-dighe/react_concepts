import { memo, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore (private mode / quota)
  }
}

const DEFAULT_TASKS = [
  { id: 't1', title: 'Wire reducer + persistence', status: 'todo', priority: 'high', tags: ['react', 'state'], createdAt: Date.now() - 1000 * 60 * 60 * 10 },
  { id: 't2', title: 'Build reusable TaskCard', status: 'doing', priority: 'med', tags: ['components'], createdAt: Date.now() - 1000 * 60 * 60 * 6 },
  { id: 't3', title: 'Add filtering + search', status: 'done', priority: 'low', tags: ['ux'], createdAt: Date.now() - 1000 * 60 * 60 * 2 },
]

function taskReducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return { ...state, tasks: action.payload.tasks, ui: { ...state.ui, ...action.payload.ui } }
    case 'add': {
      const task = action.payload
      return { ...state, tasks: [task, ...state.tasks] }
    }
    case 'update': {
      const { id, patch } = action.payload
      return { ...state, tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) }
    }
    case 'remove': {
      const id = action.payload
      return { ...state, tasks: state.tasks.filter((t) => t.id !== id) }
    }
    case 'setUi':
      return { ...state, ui: { ...state.ui, ...action.payload } }
    case 'reset':
      return initialState()
    default:
      return state
  }
}

function initialState() {
  return {
    tasks: DEFAULT_TASKS,
    ui: {
      query: '',
      status: 'all',
      priority: 'all',
      tag: 'all',
      sort: 'newest',
    },
  }
}

const TaskCard = memo(function TaskCard({ task, onMove, onTogglePriority, onRemove }) {
  return (
    <div className="tf-card">
      <div className="tf-cardTop">
        <div className="tf-titleRow">
          <div className="tf-title">{task.title}</div>
          <span className={`tf-priority tf-priority--${task.priority}`}>{task.priority}</span>
        </div>
        <div className="tf-tags">
          {task.tags.map((tag) => (
            <span key={tag} className="tf-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="tf-actions">
        <div className="tf-move">
          <button onClick={() => onMove(task.id, 'todo')} disabled={task.status === 'todo'}>To-do</button>
          <button onClick={() => onMove(task.id, 'doing')} disabled={task.status === 'doing'}>Doing</button>
          <button onClick={() => onMove(task.id, 'done')} disabled={task.status === 'done'}>Done</button>
        </div>
        <div className="tf-cta">
          <button onClick={() => onTogglePriority(task.id)} style={{ background: '#999' }}>Toggle priority</button>
          <button onClick={() => onRemove(task.id)} style={{ background: '#ef4444' }}>Delete</button>
        </div>
      </div>
    </div>
  )
})

export default function TaskFlow() {
  const [state, dispatch] = useReducer(taskReducer, undefined, initialState)
  const [busy, setBusy] = useState(false)
  const titleRef = useRef(null)

  // Hydrate from localStorage once
  useEffect(() => {
    const persisted = loadJSON('taskflow:v1', null)
    if (persisted?.tasks && persisted?.ui) {
      dispatch({ type: 'hydrate', payload: persisted })
    }
  }, [])

  // Persist on change
  useEffect(() => {
    saveJSON('taskflow:v1', { tasks: state.tasks, ui: state.ui })
  }, [state.tasks, state.ui])

  const allTags = useMemo(() => {
    const s = new Set()
    state.tasks.forEach((t) => t.tags.forEach((x) => s.add(x)))
    return ['all', ...Array.from(s).sort((a, b) => a.localeCompare(b))]
  }, [state.tasks])

  const filtered = useMemo(() => {
    const q = state.ui.query.trim().toLowerCase()
    const { status, priority, tag, sort } = state.ui
    let list = state.tasks

    if (q) list = list.filter((t) => t.title.toLowerCase().includes(q) || t.tags.some((x) => x.toLowerCase().includes(q)))
    if (status !== 'all') list = list.filter((t) => t.status === status)
    if (priority !== 'all') list = list.filter((t) => t.priority === priority)
    if (tag !== 'all') list = list.filter((t) => t.tags.includes(tag))

    const byCreated = (a, b) => b.createdAt - a.createdAt
    const byTitle = (a, b) => a.title.localeCompare(b.title)

    if (sort === 'newest') list = [...list].sort(byCreated)
    if (sort === 'title') list = [...list].sort(byTitle)
    return list
  }, [state.tasks, state.ui])

  const columns = useMemo(() => {
    return {
      todo: filtered.filter((t) => t.status === 'todo'),
      doing: filtered.filter((t) => t.status === 'doing'),
      done: filtered.filter((t) => t.status === 'done'),
    }
  }, [filtered])

  const setUi = useCallback((patch) => dispatch({ type: 'setUi', payload: patch }), [])

  const move = useCallback((id, status) => {
    dispatch({ type: 'update', payload: { id, patch: { status } } })
  }, [])

  // Toggle priority with a reducer-friendly update
  const onTogglePriority = useCallback((id) => {
    const t = state.tasks.find((x) => x.id === id)
    if (!t) return
    const next = t.priority === 'low' ? 'med' : t.priority === 'med' ? 'high' : 'low'
    dispatch({ type: 'update', payload: { id, patch: { priority: next } } })
  }, [state.tasks])

  const remove = useCallback((id) => dispatch({ type: 'remove', payload: id }), [])

  const addTask = async (e) => {
    e.preventDefault()
    const title = titleRef.current?.value?.trim() ?? ''
    if (!title) return

    setBusy(true)
    await new Promise((r) => setTimeout(r, 250)) // simulate async (API)

    const tags = title
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w.replace(/[^a-z0-9-]/gi, '').toLowerCase())
      .filter(Boolean)

    dispatch({
      type: 'add',
      payload: {
        id: uid(),
        title,
        status: 'todo',
        priority: 'med',
        tags: tags.length ? tags : ['task'],
        createdAt: Date.now(),
      },
    })
    if (titleRef.current) titleRef.current.value = ''
    setBusy(false)
  }

  return (
    <div>
      <h2 className="section-title">🧩 Mini Project: TaskFlow</h2>

      <div className="card">
        <h3 className="subsection-title">What this demo covers</h3>
        <div className="example-output" style={{ margin: 0 }}>
          <ul>
            <li><strong>State</strong>: <code>useReducer</code> for tasks + UI filters</li>
            <li><strong>Derived state</strong>: <code>useMemo</code> for filtering and columns</li>
            <li><strong>Performance</strong>: memoized <code>TaskCard</code> + stable callbacks</li>
            <li><strong>Forms</strong>: controlled-ish add flow via <code>ref</code> (fast input)</li>
            <li><strong>Side effects</strong>: localStorage hydration + persistence</li>
          </ul>
        </div>
      </div>

      <div className="tf-shell">
        <div className="tf-topbar">
          <form onSubmit={addTask} className="tf-add">
            <input ref={titleRef} placeholder="Add a task (e.g. “learn memoization”)…" />
            <button type="submit" disabled={busy}>{busy ? 'Adding…' : 'Add'}</button>
          </form>

          <div className="tf-filters">
            <input
              value={state.ui.query}
              onChange={(e) => setUi({ query: e.target.value })}
              placeholder="Search title / tags…"
            />
            <select value={state.ui.status} onChange={(e) => setUi({ status: e.target.value })}>
              <option value="all">All status</option>
              <option value="todo">To-do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <select value={state.ui.priority} onChange={(e) => setUi({ priority: e.target.value })}>
              <option value="all">All priority</option>
              <option value="low">low</option>
              <option value="med">med</option>
              <option value="high">high</option>
            </select>
            <select value={state.ui.tag} onChange={(e) => setUi({ tag: e.target.value })}>
              {allTags.map((t) => (
                <option key={t} value={t}>{t === 'all' ? 'All tags' : t}</option>
              ))}
            </select>
            <select value={state.ui.sort} onChange={(e) => setUi({ sort: e.target.value })}>
              <option value="newest">Newest</option>
              <option value="title">Title</option>
            </select>
            <button type="button" onClick={() => dispatch({ type: 'reset' })} style={{ background: '#999' }}>
              Reset demo
            </button>
          </div>
        </div>

        <div className="tf-board">
          {(['todo', 'doing', 'done']).map((col) => (
            <div key={col} className="tf-col">
              <div className="tf-colHeader">
                <div className="tf-colTitle">{col === 'todo' ? 'To-do' : col === 'doing' ? 'Doing' : 'Done'}</div>
                <div className="tf-count">{columns[col].length}</div>
              </div>
              <div className="tf-colBody">
                {columns[col].length === 0 ? (
                  <div className="tf-empty">No tasks here.</div>
                ) : (
                  columns[col].map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onMove={move}
                      onTogglePriority={onTogglePriority}
                      onRemove={remove}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

