import { useCallback, useEffect, useState } from "react";
import { Container, Form, SubmitButton, List, ButtonTrash } from "./styles";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import { api } from "../../services/api";
import { Link } from "react-router-dom";


export function Main(){

    const [repoName, setRepoName] = useState("");
    const [listRepos, setListRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);


    useEffect(() => {
        const repository = (localStorage.getItem("listRepositories"));

        if(repository && JSON.parse(repository).length > 0){
            setListRepos(JSON.parse(repository));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("listRepositories", JSON.stringify(listRepos));
    }, [listRepos]);

    
    

    const handlerSubmitForms = useCallback((event) => {
        event.preventDefault();

        
        async function getRepository(){

            setLoading(true);

            try{

                if(!repoName){
                    throw new Error("Você precisa indicar um repositorio.");
                }

                const hasRepository = listRepos.find((repository) => repository.name === repoName);
                if(hasRepository){
                    throw new Error("Este repositorio já foi adicionado.");
                }


                const response = await api.get(`repos/${repoName}`);
                const data = {
                    name: response.data.full_name
                };

                setListRepos([...listRepos, data]);
                setRepoName("");
            }catch(err){
                setAlert(true);
            }finally{
                setLoading(false);
            }
        }
        getRepository();

    }, [repoName, listRepos]);

    const handlerDeleteRepository = useCallback((name) => {
        const newList = listRepos.filter((repository) => repository.name !== name);
        setListRepos(newList);
    }, [listRepos]);


    return(
        <Container>

            <h1>
                <FaGithub size={25}/>
                Meus respositorios
            </h1>

            <Form onSubmit={handlerSubmitForms} alert={alert}>
                <input
                    placeholder="Adicionar repositorios"
                    value={repoName}  
                    onChange={(e) => {
                        setRepoName(e.target.value);
                        setAlert(false);
                    }}            
                />
                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner fontSize={16} color="#FFF"/>
                    ):(
                        <FaPlus fontSize={16} color="#FFF"/>
                    )}
                </SubmitButton>
            </Form>

            <List>
                {listRepos.map((repository, index) => {
                    return(
                        <li key={index}>
                            <span>{repository.name}</span>
                            <div>
                                <ButtonTrash onClick={() => handlerDeleteRepository(repository.name)}>
                                    <FaTrash size={16}/>
                                </ButtonTrash>
                                <Link to={`/repositorio/${encodeURIComponent(repository.name)}`}>
                                    <FaBars size={16}/>
                                </Link>
                            </div>
                            
                        </li>
                    );
                })}
            </List>
        </Container>
        
    );
}