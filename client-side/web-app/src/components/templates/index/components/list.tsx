import { memo } from 'react';
import { ReactNode } from 'react';
import { throwError } from '../../../../logic/app-internals/utils/throw-error';

type Data = Array<{ [key: string]: unknown }>;

/**
 * If the function references (like with a pure static function)
 * and the object references stay the same,
 * the component won't re-render unnecessarily
 */
type Props<T extends Data> = {
  selected: Record<string, boolean>;
  onSelectedChange: (selected: Record<string, boolean>) => void;
  data: T;
  /**
    To keep the same elements selected in case the array order changes,
    I try to index them by ID after receiving a list of elements

    By getting the id, you can provide that same ID as a key to a React Component list,
    and can change the object reference (in case the whole data is refreshed with new data from the server)
    knowing that it won't break the selection, since it's the data id that's being used as a pointer

    It also makes it for an easier way of toggling selected states,
    since you only have to erase the id from the selected row from the selected items indexes object
    or set it to true, instead of moving items back and forth in an array of selected item ids
  */
  getId: (item: T[number]) => string | number;
  renderContent: (item: T[number]) => ReactNode;
};

function ListImpl<T extends Data>(props: Props<T>) {
  const indexedData: { [key: string]: T[number] } = {};

  for (const item of props.data) {
    const itemId = props.getId(item);

    indexedData[itemId] = item;
  }

  const itemsIds = Object.keys(indexedData);

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-title">
            Selected items:{' '}
            {Object.keys(props.selected)
              // make sure it's selected, even if the key exists in the object
              .filter((selectedItemId) => !!props.selected[selectedItemId])
              // Get position
              .map((itemId) => itemsIds.indexOf(itemId))
              .sort((a, b) => a - b)
              // Create readable text to show to the user
              .reduce((acc, itemPosition, index) => {
                return `${acc}${index !== 0 ? ',' : ''}${itemPosition}`;
              }, '')}
          </h3>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Info</th>
            </tr>
          </thead>

          <tbody>
            {itemsIds.map((itemId) => {
              const item = indexedData[itemId] || throwError();

              const checkboxId = `check-item-${itemId}`;

              return (
                <tr key={itemId}>
                  <th scope="row">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={checkboxId}
                        checked={props.selected[itemId]}
                        onChange={(e) => {
                          const newSelected = {
                            ...props.selected,
                          };

                          if (e.target.checked) {
                            newSelected[itemId] = true;

                            props.onSelectedChange(newSelected);
                          } else {
                            delete newSelected[itemId];

                            props.onSelectedChange(newSelected);
                          }
                        }}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={checkboxId}
                      >
                        {''}
                      </label>
                    </div>
                  </th>
                  <td className="col">{props.renderContent(item)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export const List = memo(ListImpl) as typeof ListImpl;
