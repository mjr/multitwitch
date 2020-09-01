import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function ListStreams({ streams, setStreams }) {
  const [add, setAdd] = useState(false);
  const [newStream, setNewStream] = useState("");

  return (
    <>
      <div className="flex justify-around flex-wrap">
        {streams.map((stream) => (
          <div key={stream} className="video-main">
            <div className="video-container">
              <iframe
                id={`idEmbed${capitalize(stream)}`}
                src={`https://player.twitch.tv/?muted=true&channel=${stream}&parent=localhost&parent=www.multitwitch.tv`}
                allowFullScreen={true}
              ></iframe>
              <div className="video-controls">
                <button
                  className="video-remove focus:outline-none"
                  type="button"
                  onClick={() => {
                    setStreams((prevStreams) =>
                      prevStreams.filter((prevStream) => prevStream !== stream)
                    );
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    shapeRendering="geometricPrecision"
                    style={{ color: "#000" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <div className="add-stream">
          <button
            type="button"
            className="button"
            onClick={() => setAdd(true)}
            disabled={add}
            style={{
              padding: "1rem 1rem 1rem .5rem",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              shapeRendering="geometricPrecision"
              style={{ color: "#000" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
          {add ? (
            <>
              <div className="input_container__1QFMt input_suffix__2dRFl input_noSuffixStyle__2RyuH">
                <input
                  type="text"
                  className="input_input__3wlDO"
                  placeholder="Digite o nome da stream"
                  value={newStream}
                  onChange={(event) => setNewStream(event.target.value)}
                />
                <button
                  type="button"
                  className="clearable_button__3UNRt reset_reset__3ht6- clearable_disabled__1v-wa"
                  tabIndex="-1"
                  onClick={() => {
                    setAdd(false);
                    setNewStream("");
                  }}
                >
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      shapeRendering="geometricPrecision"
                      style={{ color: "currentColor" }}
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="var(--geist-fill)"
                      ></circle>
                      <path d="M15 9l-6 6" stroke="var(--geist-stroke)"></path>
                      <path d="M9 9l6 6" stroke="var(--geist-stroke)"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <button
                type="button"
                className="add-button"
                onClick={() => {
                  setStreams((prevStreams) => [...prevStreams, newStream]);
                  setAdd(false);
                  setNewStream("");
                }}
              >
                Adicionar
              </button>
            </>
          ) : (
            <p>Clique no mais para adicionar uma stream</p>
          )}
        </div>
      </div>
    </>
  );
}

export default function Streams() {
  const router = useRouter();
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    if (!router.query.streams) return;
    setStreams(router.query.streams);
  }, [router.query.streams]);

  useEffect(() => {
    if (streams.length === 0) return;
    const href = `/${streams.join("/")}`;
    console.log(href);
    // router.push(href, href, { shallow: true });
  }, [streams]);

  return (
    <div className="h-screen d-flex flex-col">
      {/* <h1>Streams</h1> */}
      <div className="h-full">
        {streams && <ListStreams streams={streams} setStreams={setStreams} />}
      </div>
      <footer
        className="footer"
        style={{
          backgroundColor: "#fafafa",
        }}
      >
        <div className="footer-inner">
          <div className="flex justify-center">
            <p className="hidden-sm-down d-none d-lg-block">
              Check this project in{" "}
              <a
                href="http://github.com/mjr/multitwitch"
                target="_blank"
                style={{ color: "#00A4FF", cursor: "pointer" }}
              >
                Github
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

{
  /* <div className="input_container__1QFMt input_suffix__2dRFl input_noSuffixStyle__2RyuH">
                <input
                  type="text"
                  value="Disabled with value"
                  className="input_input__3wlDO"
                  disabled
                />
                <button
                  type="button"
                  className="clearable_button__3UNRt reset_reset__3ht6- clearable_disabled__1v-wa"
                  tabIndex="-1"
                >
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      shapeRendering="geometricPrecision"
                      style={{ color: "currentColor" }}
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="var(--geist-fill)"
                      ></circle>
                      <path d="M15 9l-6 6" stroke="var(--geist-stroke)"></path>
                      <path d="M9 9l6 6" stroke="var(--geist-stroke)"></path>
                    </svg>
                  </span>
                </button>
              </div> */
}
