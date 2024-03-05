import { useState } from 'react';
import '../../../../css/Inicio.css';
import { Grid, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import TitleBoxes from '../TitleBoxes';

function ListaRedacoes() {

    const [redacoes, setRedacoes] = useState([]);

    const getRedacoesPendentes = () => {
        if (redacoes.length == 0) {
            return (
                <div style={{ color: "#9b9b9b", fontSize: '14px', margin: 20 }}>
                    <span>Nenhuma redação pendente de correção.</span>
                </div>
            )
        }
        return (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={4}>
                {redacoes.map((redacao, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <div className='boxRedacao'>
                            <div className='infosBoxRedacao'>
                                <div style={{ fontSize: 20 }}> {redacao.titulo}</div>
                                <div style={{ fontSize: 14 }}>{redacao.aluno.nome} | {redacao.aluno.turma}</div>
                            </div>
                            <div>
                                <Button variant="contained">
                                    <EditIcon fontSize='small' />
                                    <span style={{ paddingLeft: 5 }}>Corrigir</span>
                                </Button>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        )
    }

    return (
        <div className="container">
            <div className='list'>
                <TitleBoxes add={true} title="Redações Pendentes" tooltip="Nova proposta" link="/proposta" />
                <div className="boxList">
                    {getRedacoesPendentes()}
                </div>
            </div>
        </div>
    );
}

export default ListaRedacoes;
