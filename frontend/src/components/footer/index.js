import React from "react";
import "./styles.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="content">
                <div className="grid-container">
                    <div>
                        <p style={{fontSize: '14px'}}><b>Plego</b></p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.</p>
                    </div>
                    <div className="column">
                        <div>
                            <p>Sosial Media</p>
                            <br></br>
                            <p>Instagram</p>
                            <p>Twitter</p>
                            <p>LinkedIn</p>
                        </div>
                        <div>
                            <p>Program</p>
                            <br></br>
                            <p>Lorem</p>
                            <p>Lorem Ipsum</p>
                        </div>
                        <div>
                            <p>DUKUNGAN</p>
                            <br></br>
                            <p>Tentang Kami</p>
                            <p>Ketentuan</p>
                            <p>Kebijakan Privasi</p>
                        </div>
                    </div>
                </div>
                <div className="box">
                    <div>
                        <p><b>Email</b></p>
                        <p>contact@website.com</p>
                    </div>
                    <div>
                        <p><b>Telephone</b></p>
                        <p>+6288 999 222 333</p>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p>© Copyright Plego 2024</p>
            </div>
        </footer>    
    );
};

export default Footer