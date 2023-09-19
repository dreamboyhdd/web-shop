import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { mainAction } from '../Redux/Actions';
import { GROUPID } from "../Services/Api";
import I18n from 'i18n-js';
const SelectCategoryComp = ({
    onSelected = () => { },
    isDisabled = false,
    clearData = [],
    isMulti = false,
    Data
}) => {
    const [data, setData] = useState([])
    const [valueS, setValueS] = useState([])
    const onSelecteItem = (item) => {
        onSelected(item)
        setValueS(item);
    }
    const dispatch = useDispatch();
    const Shop_spWeb_Categories_List = async () => {
        const params = {
            Json: JSON.stringify({
                Domain: '',
                GroupId: GROUPID
            }),
            func: "Shop_spWeb_Categories_List"
        }
        const list = await mainAction.API_spCallServer(params, dispatch);
        const FirstData = { value: 0, label: `${I18n.t("Other.AllCategory")}` };
        let dataSelect = [];

        if (isMulti === false) {
            dataSelect.push(FirstData);
            setValueS(FirstData);
        }
        list.forEach((element, index) => {
            dataSelect.push({ value: element.CategoryId, label: element.CategoryName });
        });

        if (clearData.length > 0) {
            let datatam = [], valuetam = "";
            clearData.forEach((element, index) => {
                if (element.value !== 0) {
                    valuetam = dataSelect.find(a => a.value == element.value);
                    datatam.push(valuetam);
                }
            });
            setValueS(datatam);
        }

        if (Data.length > 0) {
            for (const item of Data) {
                const a = dataSelect.filter(a => a.value == item.value && item.value !== 0)
                arr.push(...a);
            }
            setValueS(arr)
        }

        else {
            setValueS({ value: 0, label: `${I18n.t("Other.AllCategory")}` });
        }
        setData(dataSelect)
    }

    useEffect(() => {
        Shop_spWeb_Categories_List()
    }, []);

    //#region dùng cho select multi 

    let arr = []

    useEffect(() => {
        if (Data.value === 0) {
            setValueS({ value: 0, label: `${I18n.t("Other.AllCategory")}` })
        }
        else {
            const a = data.filter(a => a.value == Data.value)
            arr.push(...a);
            setValueS(arr)
        }
    }, [Data]);

    useEffect(() => {
        if (isMulti === true) {
            if (clearData.length === 0) {
                setValueS({ value: 0, label: `${I18n.t("Other.AllCategory")}` })
            }
            else {
                for (const item of clearData) {
                    const a = data.filter(a => a.value == item.value && item.value !== 0)
                    // const a = data.filter(a => a.value == item)
                    arr.push(...a);
                }
                setValueS(arr)
            }
        }
    }, [clearData]);
    //#endregion
    return (
        <Select
            value={valueS}
            onChange={onSelecteItem}
            options={data}
            isMulti={isMulti}
            isDisabled={isDisabled}
            menuPosition={'fixed'}
        />
    )
}


export const SelectCategory = React.memo(SelectCategoryComp)