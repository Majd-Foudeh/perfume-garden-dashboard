import { useContext } from "react";
import { Stats } from "./Stats";
import { TableOfBooks } from "../Books Page/TableOfBooks";
import { TableOfWriters } from "../Writers Page/TableOfWriters";

import { TableOfHistory } from "../History Page/TableOfHistory";

import { RefreshContext } from "../../App";
import { TableOfOrders } from "../Orders page/TableOfOrders";
import { TableOfOrdersHistory } from "../orders History/TableOfOrdersHistory";

export const Main = () => {
  const { refresh, setRefresh } = useContext(RefreshContext);
  return (
    <main className="p-4 px-8  md:ml-60 h-auto py-20 mt-2 ">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 ">
        <Stats setRefresh={setRefresh} refresh={refresh} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <TableOfBooks setRefresh={setRefresh} refresh={refresh} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <TableOfWriters setRefresh={setRefresh} refresh={refresh} />
      </div>
    
      <div className="grid grid-cols-1 gap-4">
        <TableOfOrdersHistory setRefresh={setRefresh} refresh={refresh} />
      </div>
    </main>
  );
};
