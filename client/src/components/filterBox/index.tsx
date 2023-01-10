import { useState } from "react";
import { FireOutlined, RocketOutlined, StarOutlined, ToTopOutlined } from "@ant-design/icons";
import './index.css';

const FilterPostBox = () => {
  const [btn, setBtn] = useState<string>('best');

  const handleBtnFilter = (e: any) => {
    setBtn(e.target.name);
  }

  return (
    <div className="filter-post-row">
      <button type="button" name="best" className={btn === 'best' ? 'btn-active' : ''}
        onClick={handleBtnFilter}
      ><RocketOutlined /> Best</button>
      <button type="button" name="hot" className={btn === 'hot' ? 'btn-active' : ''}
        onClick={handleBtnFilter}
      ><FireOutlined /> Hot</button>
      <button type="button" name="new" className={btn === 'new' ? 'btn-active' : ''}
        onClick={handleBtnFilter}
      ><StarOutlined /> New</button>
      <button type="button" name="top" className={btn === 'top' ? 'btn-active' : ''}
      onClick={handleBtnFilter}
      ><ToTopOutlined /> Top</button>
    </div>
  );
}

export default FilterPostBox;