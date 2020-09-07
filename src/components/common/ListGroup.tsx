import React from "react";

export const ListGroup = ({
  items: genres,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem
}: any) => {

  return (
    <>
      <ul className="list-group">
        {genres.map((genre: any) => {
          return (
            <li
              key={genre[valueProperty]}
              onClick={() => onItemSelect(genre)}
              className={
                selectedItem === genre
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {genre[textProperty]}
            </li>
          );
        })}
      </ul>
    </>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
