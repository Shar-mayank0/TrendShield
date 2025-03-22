import React from "react";
import './globals.css';

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html>
            <body className="vsc-initialized">
                <div>
                    {children}
                </div>
            </body>
        </html>
    );
}