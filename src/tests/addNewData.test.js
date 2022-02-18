import addNewData, {
  changeOrderWithThePrice,
  addNewPriceToBook,
  countNewTotal,
  reCountTotals,
  findIndexForNewOrder,
  delExtraOrders,
  findPriceAndDelete
} from '../store/addNewData'
import data from './data'
import dataflow from './dataflow'

describe('countNewTotal', () => {
  test('', () => {
    expect(1+2).toBe(3);
  });
})
