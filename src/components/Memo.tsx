import React, {useState, useMemo} from 'react'

const RMemo = React.memo(({label, value}: {label: string; value: number}) => {
  return <Row label={label} value={value} />
})

function Row(props: {label: string; value: number}) {
  const {label, value} = props

  console.log('Render Row')

  return (
    <div>
      <span style={{marginRight: '20px'}}>{label}:</span>
      <span>{value}</span>
    </div>
  )
}

export default function Memo() {
  console.log('Render Memo')

  const [btn, setBtn] = useState(0)
  const [state, setState] = useState({
    title: 'Test App',
    list: Array.from(Array(10)).map((_, index) => ({
      value: Math.random(),
      label: `Number ${index + 1}`,
    })),
  })

  const handleUpdate = function () {
    console.log('handleUpdate')

    state.list[0].value = Math.random()
    setState({...state})
  }

  const RowMemo = useMemo(() => {
    console.log('useMemo RowMemo')

    return state.list.map(({label, value}) => {
      console.log('useMemo map')

      return <RMemo label={label} value={value} key={value} />
    })
  }, [state])

  return (
    <div>
      <h1>{state.title}</h1>
      <button onClick={() => setBtn(btn + 1)}>Render: {btn}</button>
      <br></br>
      <br></br>
      <button onClick={handleUpdate}>Update first</button>
      {RowMemo}
    </div>
  )
}
