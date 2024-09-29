import { Radio, RadioChangeEvent } from 'antd';
import React from 'react';
import './radioCustom.s.scss';

interface IPropsRadio {
    checked: boolean;
    onChange?: (e: RadioChangeEvent) => void;
}

const RadioCustom: React.FC<IPropsRadio> = ({ checked, onChange }) => {
  return <Radio checked={checked} onChange={onChange} className="custom-radio" />;
};

export default RadioCustom;
