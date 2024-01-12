import React, { useState, useEffect } from "react";
import Title from "../Title/Title";
import { useGlobalContext } from "../../store/context";
import Catalog from "./Catalog";

const FilterBar = ({ onValueChange }) => {
  const [branchCatelog, setBranchCatelog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categ, setCateg] = useState(["all"]);
  const [branchItemss, setbranchItemss] = useState([]);
  const { cart } = useGlobalContext();
  const members = Array.from(cart.entries());

  const filterbranchItemss = (category) => {
    setCateg(category);

    if (category === "all") {
      onValueChange("all");
      return;
    }
    const filteredArray = Array.from(branchItemss).filter(
      (branch) => branch === category
    );
    const filteredSet = new Set(filteredArray);
    setBranchCatelog(filteredSet);
    onValueChange(filteredSet);
  };

  let branchSet = new Set();
  members.map((memberbranchItems) => {
    const [id, person] = memberbranchItems;
    branchSet.add(person.branch);
  });

  const fetchBranches = () => {
    setCategories(["all", ...branchSet]);
    setbranchItemss(branchSet);
  };
  useEffect(() => {
    fetchBranches();
  }, []);

  if (members.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          / <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <>
      <Catalog
        categories={categories}
        filterItems={filterbranchItemss}
      ></Catalog>
      <Title text={categ} />
    </>
  );
};

export default FilterBar;
