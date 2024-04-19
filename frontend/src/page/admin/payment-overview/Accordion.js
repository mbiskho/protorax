import React, { useState } from "react";
import PaymentTable from "./PaymentTable";


const Accordion = ({ data, searchTerm, searchResults }) => {
  const filteredData = searchTerm ? searchResults : data;
  return (
    <div className="">
      {filteredData.map((ctx, index) => {
        const idAccordion = `collapse${index}`;
        const targetBs = `#${idAccordion}`;
        let totalAmount = 0;
        return (
          <>
            <div class="accordion mb-1" id="accordionExample" style={{
            }}>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button"
                    style={{
                      backgroundColor : "lightblue"
                    }}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={targetBs}
                    aria-expanded="false"
                    aria-controls={idAccordion}
                  >
                    <p className="col my-2">{ctx.school_name}</p>
                    {ctx.students.map((student, index) => {
                      totalAmount += student.price;
                    })}
                    <p className="col-auto mx-3 my-2"> <b>Total : </b> {totalAmount}</p>
                    
                  </button>
                </h2>
                <div
                  id={idAccordion}
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <PaymentTable student={ctx.students} />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Accordion;
