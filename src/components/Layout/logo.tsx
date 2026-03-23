export default function Logo() {
    return (
        <div>
            <img
                src="/logo.png"
                alt="logo"
                style={{
                    width: 50,
                    height: 50,
                    objectFit: "contain",
                    background: "white",
                    borderRadius: "50%",
                }}
            />
        </div>
    );
}
