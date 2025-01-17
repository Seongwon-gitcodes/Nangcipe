import Iingredients from "./Iingredients";

export default function Registration(props) {
  console.log(props);
  function makeIingredients(food) {
    return <Iingredients name={food.name} imgSrc={food.imgSrc} />;
  }
  const IingredientsList = props.data.map(makeIingredients);
  return (
    <>
      <h2>{props.title}</h2>
      <div className="registration">
        {IingredientsList}
        <hr />
      </div>
    </>
  );
  // return (
  //     <재료이름과목록이있는컴포넌트 title={재료컴포넌트} data={data}/>
  //     <재료이름과목록이있는컴포넌트 title={} data={}/>
  //     <재료이름과목록이있는컴포넌트 title={} data={}/>
  //     <재료이름과목록이있는컴포넌트 title={} data={}/>
  //     )
}
