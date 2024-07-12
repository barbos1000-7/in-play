import React, {useEffect, useState} from 'react';
import ReactHLS from 'react-hls';


const Video = ({url}) => {
    const [load, setLoad] = useState(false)
    window.c = 0


    useEffect(() => {
        if (!window.c) {
            window.c = 1
            console.log(url.split('/')[4])
            fetch(`http://localhost:3000/stream/${url.split('/')[4]}`)
                .then(res => res.text())
                .then(() => {
                    setLoad(true)
                })
                .catch(err => console.log(err));
        }
        return () => {
            fetch(`http://localhost:3000/port/${url.split('/')[4]}`, {
                method: "get",
            })
                .then(() => {
                    console.log('succes')
                })
                .catch((error) => console.error("Error deleting post:", error));


        }
    }, [])
    console.log(url.split('/')[4])
    return (
        <div id="body">
            {load && <ReactHLS autoplay={true} url={`http://localhost:3000/${url.split('/')[4]}.m3u8`}/>}
        </div>
    );
};

export default Video;