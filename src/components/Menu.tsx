import styled from "styled-components";
import Button from "./Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const SMenu = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`;

const SelectWrapper = styled.div``;

const SelectBox = styled.select`
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.inputColor};
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-family: "Nanum Gothic", serif;
`;

const Option = styled.option``;

const ButtonWrapper = styled.div`
  flex-grow: 1;
  button {
    width: 100%;
  }
`;

const sortOptions = [
  { value: "desc", name: "최신순" },
  { value: "asc", name: "오래된 순" },
];

interface ISelectProps {
  sortType?: string;
  setSortType?: React.Dispatch<React.SetStateAction<string>>;
}

function Menu({ sortType, setSortType }: ISelectProps) {
  const navigate = useNavigate();

  const onChangeSortType = (event: React.FormEvent<HTMLSelectElement>) => {
    setSortType?.(event.currentTarget.value);
  };

  const goNew = () => {
    navigate("/new");
  };

  return (
    <SMenu>
      <SelectWrapper>
        <SelectBox value={sortType} onChange={onChangeSortType}>
          {sortOptions.map((option, index) => (
            <Option key={index} value={option.value}>
              {option.name}
            </Option>
          ))}
        </SelectBox>
      </SelectWrapper>
      <ButtonWrapper>
        <Button
          colorType={"POSITIVE"}
          text={"새 일기 쓰러가기"}
          onClick={goNew}
        />
      </ButtonWrapper>
    </SMenu>
  );
}

export default Menu;
