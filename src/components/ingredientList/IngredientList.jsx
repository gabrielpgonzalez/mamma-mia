const IngredientList = ({ ingredients }) => {
  return (
    <>
      <p className="fs-5 fw-light text-secondary mb-0">🍕 Ingredientes:</p>
      <ul className="mb-1 list-inline text-capitalize">
        {ingredients?.map((ingredient, i) => (
          <li key={ingredient} className="list-inline-item">
            {i > 0 && <span className="me-2 text-body-tertiary">|</span>}
            {ingredient}
          </li>
        ))}
      </ul>
    </>
  );
};

export default IngredientList;
