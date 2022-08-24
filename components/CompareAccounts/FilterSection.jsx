import { useRouter } from "next/router";

import slug from "slug";

import CheckBox from "./CheckBox";

import useFilters from "./useFilters";

const FilterSection = ({ title, values }) => {
  const router = useRouter();
  const filters = useFilters();

  const handleChange = (e) => {
    e.target.checked
      ? filters.setFilter(e.target.name, "on")
      : filters.removeFilter(e.target.name);
  };

  return (
    <div className="">
      <div className="mb-3 text-lg font-bold">{title}</div>
      <div className="grid sm:grid-cols-2 lg:block space-y-3">
        {values.map((v) => {
          const name = slug(v);

          return (
            <div key={name} className="flex">
              <CheckBox
                id={name}
                name={name}
                label={v}
                value={filters.isFilterActive(v)}
                description={`Add ${title} search filter "${v}"`}
                onChange={handleChange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;
