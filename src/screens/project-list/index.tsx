import React from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject, useDebounce, useMount} from "../../utils";
import {useHttp} from "../../utils/http";


export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });

  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 200);
  const [list, setList] = useState([]);
  const client = useHttp()

  useEffect(() => {
    client('projects', {data: cleanObject(debouncedParam)}).then(setList)
  }, [debouncedParam]);

  useMount(() => {
    client('users').then(setUsers)
  });

  // @ts-ignore
  return <div>
    <SearchPanel param={param} setParam={setParam} users={users}/>
    <List users={users} list={list}/>
  </div>
}
