import React from "react";
import "./MealPlans.css";
import PostForm from "./PostsForm";
import Meals2 from '../../StaticImages/MealPlanImgs/Meals2.jpg' ;
import Meals3 from '../../StaticImages/MealPlanImgs/Meals3.jpg' ;
import Meals1 from '../../StaticImages/MealPlanImgs/Meals1.jpg' ;
  
const MealPlans = () => {

  // const blogPosts = [
  //   {
  //     title: "JAVASCRIPT",
  //     body: `JavaScript is the world most popular 
  //     lightweight, interpreted compiled programming 
  //     language. It is also known as scripting 
  //     language for web pages. It is well-known for 
  //     the development of web pages, many non-browser 
  //     environments also use it. JavaScript can be 
  //     used for Client-side developments as well as 
  //     Server-side developments`,
  //     author: "Nishant Singh ",
  //     imgUrl:
  //       "https://media.geeksforgeeks.org/img-practice/banner/diving-into-excel-thumbnail.png",
  //   },
  //   {
  //     title: "Data Structure ",
  //     body: `There are many real-life examples of 
  //     a stack. Consider an example of plates stacked 
  //     over one another in the canteen. The plate 
  //     which is at the top is the first one to be 
  //     removed, i.e. the plate which has been placed 
  //     at the bottommost position remains in the 
  //     stack for the longest period of time. So, it 
  //     can be simply seen to follow LIFO(Last In 
  //     First Out)/FILO(First In Last Out) order.`,
  //     author: "Suresh Kr",
  //     imgUrl:
  //       "https://media.geeksforgeeks.org/img-practice/banner/coa-gate-2022-thumbnail.png",
  //   },
  //   {
  //     title: "Algorithm",
  //     body: `The word Algorithm means “a process 
  //     or set of rules to be followed in calculations 
  //     or other problem-solving operations”. Therefore 
  //     Algorithm refers to a set of rules/instructions 
  //     that step-by-step define how a work is to be 
  //     executed upon in order to get the expected 
  //     results. `,
  //     author: "Monu Kr",
  //     imgUrl:
  //       "https://therme.ro/",
  //   },
  //   {
  //     title: "How to Build an Exercise Plan",
  //     body: `No single type of exercise can help you reach your fitness goals or keep you motivated. 
  //     But this guide to getting started can help you develop a balanced exercise plan that works for you. `, 
  //     author: "Sonu Kr",
  //     imgUrl:
  //       "https://media.geeksforgeeks.org/img-practice/banner/cp-maths-java-thumbnail.png",
  //     link: "https://www.google.ro",
  //   },
  // ];
  
  return (
    <div className="all-posts">
    <div className="posts-container">
    <div className="row">
      <div className="column">
        <img className="meals-img"  src={Meals1} alt="Meals1" style={{  height: '600px', width:'100%' }} ></img>
      </div>
      <div className="column">
        <img className="meals-img"  src={Meals2} alt="Meals2" style={{  height: '600px', width:'100%'}} ></img>
      </div>
      <div className="column">
        <img className="meals-img"  src={Meals3} alt="Meals3" style={{  height: '600px', width:'100%'}} ></img>
      </div>
    </div>
      {/* <div className="row">
        {blogPosts.map((post, index) => (
          <div className="col-md-4" key={index}>
            <PostForm post={post} />
          </div>
        ))}
      </div> */}
    </div>
    </div>
  );
};

export default MealPlans;