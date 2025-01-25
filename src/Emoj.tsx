interface Props{
    res: {[key: string]: number} | null;
}

function Emoj({res} : Props){
    const normal = res? res.normal : 0;
    const depressed = res ? res.depressed : 0;

    // rescaling
    const total = normal + depressed || 1;
    const normPercent = (normal  / total) * 100;
    const depPercent = (depressed / total) * 100;

    const THRESHOLD = 0.5;
    const adjustNorm = Math.max(normPercent, THRESHOLD);
    const adjustDep = Math.max(depPercent, THRESHOLD);

    const scaled = 100 / (adjustNorm + adjustDep);
    const fNorm = Math.round(adjustNorm * scaled);
    const fDep = Math.round(adjustDep * scaled);

    const condition = fNorm > fDep;
    console.log(fNorm, fDep, condition)

    return (
            <div className="relative w-20 h-20 rounded-full shadow-lg"
                id="eye"
                style={{
                    background: condition ?
                        `linear-gradient(
                                to bottom,
                                #E16A54 0,
                                #E16A54 ${fDep}%,
                                #B1C29E ${fNorm}%,
                                #B1C29E 100%)`:
                        `linear-gradient(
                                to bottom,
                                #B1C29E 0,
                                #B1C29E ${fNorm}%,
                                #E16A54 ${fDep}%,
                                #E16A54 100%)`

                }}>
                <div className="absolute top-3/4 left-2/4" id="eyes">
                    <div className="w-[5px] h-[5px] bg-slate-900 rounded-full"></div>
                </div>
                <div className="absolute top-3/4 right-1/4" id="eyes">
                    <div className="w-[5px] h-[5px] bg-slate-900 rounded-full"></div>
                </div>

                <div className="absolute bottom-[5px] right-2 w-[25px] h-[25px] border-r-2 border-b-2 border-slate-900 rounded-br-full"></div>
            </div>
    )
}

export default Emoj;
