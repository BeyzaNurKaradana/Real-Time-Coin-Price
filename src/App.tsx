import React from "react";
import './App.css'

function App() {


  return (
    <>
      <div className="container mx-auto">
      <div className="flex flex-col mt-9 border border-gray-100 rounded">
        <table className="w-full table-auto border-gray-100">
          <thead className="bg-slate-100 border-b ">
            <tr className="opacity-40 ">
              <th className="text-left">Crypto</th>
              <th className="text-right">Price</th>
              <th className="text-right">Market Value</th>
              <th>24h Change</th>
            </tr>
          </thead>
          <tbody>
            
              <tr className="text-center" >
                <td className="py-4 text-left flex leading-5">
                  gdfgfd
                </td>
                <td className="py-4 text-right">
                  sdfdf
                </td>

                <td className="py-4 text-right">
                  dfdfdf
                </td>
                <td className="py-4">
                  sdfdsf
                </td>
              </tr>
          </tbody>
        </table>
        
      </div>

    </div>
    </>
  )
}

export default App
