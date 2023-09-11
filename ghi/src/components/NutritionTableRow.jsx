function NutritionTableRow(props) {
  const { type, amount, unit } = props;
  return (
    <>
      <tr>
        <th colSpan="2">
          <b>{type}</b>
        </th>
        <td>
          <b>
            {amount}
            {unit}
          </b>
        </td>
      </tr>
    </>
  );
}

export default NutritionTableRow;
