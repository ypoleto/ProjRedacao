import { useEffect, useState } from 'react';
import '../../../../css/Inicio.css';
import Turma from './FormTurma';
import { Backdrop, Button, CircularProgress, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TitleBoxes from '../../../../components/TitleBoxes';
import { getUser } from '../../../../utils/user';
import axios from 'axios';

function ListaTurmas() {

    const [dialogNovaTurma, setDialogNovaTurma] = useState(false);
    const [turma, setTurma] = useState({});
    const [method, setMethod] = useState('POST');
    const [turmas, setTurmas] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleEdit = (t) => {
        setTurma(t);
        setDialogNovaTurma(true);
        setMethod('PUT');
    }

    const fetchTurmas = () => {
        setLoading(true);
        axios.get('http://localhost:8000/turmas')
            .then(response => {
                var aux = response.data.filter(item => item.professor == getUser().username);
                setTurmas(aux)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const getTurmas = () => {
        if (turmas.length == 0) {
            return (
                <div style={{ color: "#9b9b9b", fontSize: '14px', margin: 20 }}>
                    <span>Nenhuma turma cadastrada.</span>
                </div>
            )
        }
        return (
            <>
                {turmas.map((turma) => (
                    <>
                        <div className='boxTurma'>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}> {turma.nome}</div>
                                <div style={{ fontSize: 14 }}> {turma.colegio}</div>
                                <div style={{ fontSize: 14 }}>{turma.cidade} - {turma.estado}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                <Button variant='contained' onClick={() => handleEdit(turma)}>
                                    Editar
                                </Button>
                            </div>
                        </div>
                    </>
                ))}
            </>
        )
    }

    const handleClose = () => {
        setDialogNovaTurma(false);
    }

    useEffect(() => {
        fetchTurmas();
    }, [])


    return (
        <>
            <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="container">
                <div className='list'>
                    <TitleBoxes add={true} title="Minhas turmas" tooltip="Nova turma" func={() => setDialogNovaTurma(true)} />
                    <div className="boxList">
                        {getTurmas()}
                    </div>
                </div>
            </div>
            <Dialog
                open={dialogNovaTurma}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            height: "100%",
                            maxWidth: "700px",
                            maxHeight: "400px",
                        },
                    },
                }}
            >
                <DialogTitle>
                    <TitleBoxes title={method === "POST" ? "Nova turma" : "Editar turma"} />
                </DialogTitle>
                <Divider></Divider>
                <DialogContent>
                    <Turma setCidades={setCidades} cidades={cidades} turma={turma} setTurma={setTurma} turmas={turmas} method={method} setTurmas={setTurmas} setDialogNovaTurma={setDialogNovaTurma} />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ListaTurmas;
