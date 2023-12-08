import DateSelector from "components/date/dateSelector";
import CustomSelector, { Options } from "components/select/customSelector";
import { CompareType } from "config/constants";
import dayjs from "dayjs";
import { MouseEvent, useEffect, useState } from "react";
import { fetchInstall } from "src/redux/actions/fetchInstall";
import { fetchProgramDetail } from "src/redux/actions/fetchProgramDetail";
import { fetchProgramList } from "src/redux/actions/fetchProgramList";
import { selectCompareState } from "src/redux/reducers/code/compareReducer";
import {
  selectMachine,
  selectMachineState,
  selectSubMachine,
} from "src/redux/reducers/machine/machineReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxHook";

export default function CompareFilter({ type }: { type: CompareType }) {
  const isCriteria = type === CompareType.CRITERIA;
  const machines = useAppSelector(selectMachineState);
  const codes = useAppSelector(selectCompareState);
  const [machineOptions, setMachineOptions] = useState<Options[]>([]);
  const [codeOptions, setCodeOptions] = useState<Options[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInstall());
  }, []);

  useEffect(() => {
    setMachineOptions(
      machines.list.map((machine) => {
        return { id: +machine.id, title: machine.name };
      })
    );
  }, [machines.list]);

  useEffect(() => {
    if (isCriteria) {
      setCodeOptions(
        codes.criteriaList?.map((code) => {
          return { id: code.lot, title: code.program };
        })
      );
    } else {
      setCodeOptions(
        codes.compareList?.map((code) => {
          return { id: code.lot, title: code.program };
        })
      );
    }
  }, [codes]);

  const handleClickCriteriaMachine = (e: MouseEvent<HTMLLIElement>) => {
    const { id } = e.currentTarget;
    console.log("criteria : ", id);
    dispatch(selectMachine(+id));
    dispatch(
      fetchProgramList({
        id: +id,
        date: dayjs(codes.criteriaModel.date).format("YYYY-MM-DD"),
        isCompare: true,
        type: CompareType.CRITERIA,
      })
    );
  };

  const handleClickCompareMachine = (e: MouseEvent<HTMLLIElement>) => {
    const { id } = e.currentTarget;
    console.log("compare : ", id);
    dispatch(selectSubMachine(+id));
    dispatch(
      fetchProgramList({
        id: +id,
        date: dayjs(codes.compareModel.date).format("YYYY-MM-DD"),
        isCompare: true,
        type: CompareType.COMPARE,
      })
    );
  };

  const handleClickCriteriaCode = (e: MouseEvent<HTMLLIElement>) => {
    const { id } = e.currentTarget;
    dispatch(fetchProgramDetail({ ncCode: id, isCompare: true, type: type }));
  };

  const handleClickCompareCode = (e: MouseEvent<HTMLLIElement>) => {
    const { id } = e.currentTarget;
    dispatch(fetchProgramDetail({ ncCode: id, isCompare: true, type: type }));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-2xl text-gray-800 dark:text-gray-200 font-semibold leading-6">
        {type === CompareType.CRITERIA ? "기준코드" : "비교코드"}
      </h2>
      <div className="flex pt-0 gap-4 w-full">
        <DateSelector type={type} />
        <CustomSelector
          options={machineOptions}
          onClick={
            isCriteria ? handleClickCriteriaMachine : handleClickCompareMachine
          }
          defaultTitle="기계 선택"
          value={
            isCriteria ? machines.activeMachine : machines.activeSubMachine
          }
        />
      </div>
      <div className="w-full">
        <CustomSelector
          options={codeOptions}
          onClick={
            isCriteria ? handleClickCriteriaCode : handleClickCompareCode
          }
          defaultTitle="코드 선택"
          value={0}
          validMessage={`표시할 옵션이 없거나\n기계를 선택하지 않았습니다.`}
        />
      </div>
    </div>
  );
}
