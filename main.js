const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

function App() {
  const [counters, setCounters] = React.useState([
    { id: 1, number: 0 },
    // { id: 2, number: 9 },
    // { id: 5, number: 7 },
  ]);
  //   ----- Sum = ----------------------------------------------
  let total = counters.reduce((a, el) => a + el.number, 0);
  console.log(total);
  // -------------------------------------------------------------
  // ---Add counter----------------------------------------------------------
  // const hdlAddCounter = () => {
  //   let newItem = { id : counters.at(-1).id +1 , number: 0}
  //   // console.log(newItem)
  //   // let cloneCounters = [...counters]
  //   // cloneCounters.push(newItem)
  //   // console.log(cloneCounters)
  //   // setCounters(cloneCounters)
  //   ท่าย่อ...
  //   setCounters([...counters, newItem])
  // }

  const hdlAddCounter = () =>
    setCounters([
      ...counters,
      { id: counters.length === 0 ? 1 : counters.at(-1).id + 1, number: 0 },
    ]);
  //-----------------------------------------------------------------
  //------- (+ -) ----------------------------------------------------------
  const hdlUpdata = (id, num) => {
    //-----เเบบที่1---------------------------------------------------------
    // const cloneCounters = [...counters];
    // let idx = cloneCounters.findIndex((el) => el.id === id);
    // if (cloneCounters[idx].number + num < 0) {
    //   return;
    // }
    // cloneCounters[idx].number += num;
    // setCounters(cloneCounters);
    //--------------------------------------------------------------------

    const newState = counters.map((el) => {
      return {
        ...el,
        number:
          el.id === id && el.number + num >= 0 ? el.number + num : el.number,
      };
    });
    setCounters(newState);
  };

  //----------------------------------------------------------------------
  //------ลบ X -----------------------------------------------------
  const hdlDelCounter = (id) => {
    const cloneCounters = [...counters];
    let idx = cloneCounters.findIndex((el) => el.id === id);
    cloneCounters.splice(idx, 1);
    setCounters(cloneCounters);
  };
  //-------------------------------------------------------------
  return (
    <>
      <h1 className="text-center">Codecamp Academy 01</h1>
      <button className="text-center" onClick={hdlAddCounter}>
        Add Counter
      </button>
      <SumInfo total={total} />
      {/* --ท่าที1---------map--------------------------------- 
      {/* {counters.map( el => {
        let output = <Counter key={el.id} item={el} />
        return output
      })}
      --------------------------------------------------*/}
      {counters.map((el) => (
        <Counter
          key={el.id}
          item={el}
          hdlUpdata={hdlUpdata}
          hdlDelCounter={hdlDelCounter}
        />
      ))}
    </>
  );
}

function SumInfo(props) {
  return (
    <div className="suminfo">
      <h1> Sum = {props.total}</h1>
    </div>
  );
}

function Counter(props) {
  console.log(props);
  return (
    <div className="counter">
      <button onClick={() => props.hdlUpdata(props.item.id, -1)}>-</button>
      <h3>{props.item.number}</h3>
      <button onClick={() => props.hdlUpdata(props.item.id, 1)}>+</button>
      <button
        onClick={() => props.hdlUpdata(props.item.id, -props.item.number)}
      >
        C
      </button>
      <button onClick={() => props.hdlDelCounter(props.item.id)}>X</button>
    </div>
  );
}
