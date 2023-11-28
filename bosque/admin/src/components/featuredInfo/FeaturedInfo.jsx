import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch income data
        const incomeRes = await userRequest.get("orders/income");
        setIncome(incomeRes.data);
        setPerc((incomeRes.data[1].total * 100) / incomeRes.data[0].total - 100);

        // Fetch order count
        const ordersRes = await userRequest.get("orders/count");
        setOrderCount(ordersRes.data);

        // Calculate profit (60% of total income)
        const calculatedProfit = (incomeRes.data[1].total * 60) / 100;
        setProfit(calculatedProfit);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Faturamento</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">R${income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Comparado com mês passado</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Vendas</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{orderCount}</span>
          <span className="featuredMoneyRate">
             <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Comparado com mês passado</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Lucro</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">R${profit}</span>
          <span className="featuredMoneyRate">
            {((profit / income[1]?.total) * 100).toFixed(1)}%{" "}
            <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Comparado com mês passado</span>
      </div>
    </div>
  );
}
