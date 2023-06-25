import { useContext} from 'react';
import { TableOfQuotes } from "./TableOfQuotes";

import {QuoteForm} from './QuoteForm';
import { RefreshContext } from "../../App";
export const Quotes = () => {
  // const [refresh,setRefresh]= useState(true)
  const {refresh,setRefresh} = useContext(RefreshContext)
  return (
    <div>
    
      <main className="p-4 px-8  md:ml-64 h-auto pt-20 mt-8">
       
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mb-4">
          <QuoteForm setRefresh={setRefresh} refresh={refresh}/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mb-4">
          <TableOfQuotes setRefresh={setRefresh} refresh={refresh}/>
        </div>
      </main>
     
    </div>
  );
};