import { useEffect, useState } from "react";
import { Container, Owner, LoadingPage, Backbutton, IssuesList, PAgeActions, SectionFilter } from "./styles"
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

export function Repositorio(){

    const {repositoryName} = useParams();

    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("all");
    const [filterIndex, setFilterIndex] = useState(0);

    useEffect(() => {

        async function getRepository(){

            try{

                const [repository, issues] = await Promise.all([
                    api.get(`/repos/${repositoryName}`),
                    api.get(`repos/${repositoryName}/issues`, {
                        params:{
                            state: filter,
                            per_page: 5,
                            page
                        }
                        
                    })
                ]);

                setRepository(repository.data);
                setIssues(issues.data);

            }catch(err){
                setLoading(false);
                console.log(err);
            }

            setLoading(false);

        }

        getRepository();

    }, [repositoryName, page, filter]);


    function handlerPage(action){
        if(action === "back"){
            if(page > 1){
                setPage(page -1);
            }

            return;
        }

        setPage(page + 1);
    }

    function handlerFilter(type, index){
        setFilter(type);
        setFilterIndex(index)
        setPage(1);
    }


    if(loading){
        return(
            <LoadingPage>
                <h1>Carregando...</h1>
            </LoadingPage>
        );
    }


    return(
        <Container>
            <Backbutton to="/">
                <FaArrowLeft color="#000"/>
            </Backbutton>
            
            <Owner>
                <img src={repository.owner.avatar_url} alt={`image ${repository.owner.login}`}/>
                <h1>{repository.name}</h1>
                <p>{repository.description}</p>
            </Owner>

            <SectionFilter active={filterIndex}>
                <button onClick={() => handlerFilter("all", 0)}>Todos</button>
                <button onClick={() => handlerFilter("closed", 1)}>Fechados</button>
                <button onClick={() => handlerFilter("open", 2)}>Abertos</button>
            </SectionFilter>

            <IssuesList>
                {
                    issues.map((issue) => (
                        <li key={issue.id}>
                            <img src={issue.user.avatar_url} alt={issue.user.loading}/>
                            <div>
                                <strong>
                                    <a href={issue.html_url} target="_blank">{issue.title}</a>
                                    {
                                        issue.labels.map((label) => {
                                            <span key={label.id}>{label.name}</span>
                                        })
                                    }
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))
                }
            </IssuesList>

            <PAgeActions>
                <button onClick={() => handlerPage("back")}>Voltar</button>
                <span>{page}</span>
                <button onClick={() => handlerPage("next")}>Proxíma</button>
            </PAgeActions>

        </Container>
    );
}