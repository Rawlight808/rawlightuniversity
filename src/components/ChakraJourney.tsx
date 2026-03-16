import { useEffect, useMemo, useState } from 'react'
import { chakraCount, chakras } from '../data/chakras'
import { useTonePlayer } from '../audio/useTonePlayer'
import './ChakraJourney.css'

export function ChakraJourney() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [autoAdvance, setAutoAdvance] = useState(false)

  const { playTone, stopTone, isPlaying } = useTonePlayer()

  const currentChakra = useMemo(() => chakras[currentIndex], [currentIndex])

  const handlePlayPause = () => {
    if (isPlaying) {
      stopTone()
    } else {
      playTone(currentChakra.frequencyHz)
    }
  }

  const goToIndex = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= chakraCount) return
    setCurrentIndex(nextIndex)
    setImageIndex(0)
  }

  const handlePrevious = () => {
    goToIndex(currentIndex - 1)
  }

  const handleNext = () => {
    goToIndex(currentIndex + 1)
  }

  const handleToggleAuto = () => {
    setAutoAdvance((prev) => !prev)
  }

  const activeImage =
    currentChakra.images.length > 0
      ? currentChakra.images[imageIndex % currentChakra.images.length]
      : undefined

  useEffect(() => {
    if (!autoAdvance) return

    const ms = currentChakra.recommendedDurationSeconds * 1000
    const timer = window.setTimeout(() => {
      if (currentIndex < chakraCount - 1) {
        goToIndex(currentIndex + 1)
        playTone(chakras[currentIndex + 1].frequencyHz)
      } else {
        setAutoAdvance(false)
        stopTone()
      }
    }, ms)

    return () => {
      window.clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAdvance, currentIndex, currentChakra.recommendedDurationSeconds])

  return (
    <div
      className="chakra-journey"
      style={{
        background: `radial-gradient(circle at top, ${currentChakra.gradientTo}, ${currentChakra.gradientFrom})`,
      }}
    >
      <div className="chakra-journey__content">
        <aside className="chakra-journey__sidebar" aria-label="Chakra progress">
          <div className="chakra-list">
            {chakras.map((chakra) => (
              <button
                key={chakra.id}
                type="button"
                className={[
                  'chakra-list__item',
                  chakra.index === currentIndex ? 'chakra-list__item--active' : '',
                ]
                  .join(' ')
                  .trim()}
                onClick={() => goToIndex(chakra.index)}
              >
                <span
                  className="chakra-list__dot"
                  style={{ backgroundColor: chakra.color }}
                  aria-hidden="true"
                />
                <span className="chakra-list__label">
                  {chakra.index + 1}. {chakra.name}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <main className="chakra-journey__main">
          <header className="chakra-header">
            <p className="chakra-header__eyebrow">
              Chakra {currentChakra.index + 1} • {currentChakra.sanskritName}
            </p>
            <h1 className="chakra-header__title">{currentChakra.name}</h1>
            <p className="chakra-header__location">{currentChakra.location}</p>
          </header>

          <section className="chakra-layout">
            <div className="chakra-visual">
              <div className="chakra-visual__glow">
                <div
                  className="chakra-visual__core"
                  style={{ backgroundColor: currentChakra.color }}
                />
              </div>

              {activeImage && (
                <div className="chakra-visual__image-frame" aria-hidden="true">
                  <img src={activeImage} alt="" className="chakra-visual__image" />
                </div>
              )}
            </div>

            <div className="chakra-info">
              <div className="chakra-note">
                <span className="chakra-note__label">Note</span>
                <span className="chakra-note__value">{currentChakra.note}</span>
                <span className="chakra-note__frequency">
                  {Math.round(currentChakra.frequencyHz)} Hz
                </span>
              </div>

              <p className="chakra-description">{currentChakra.shortDescription}</p>

              <p className="chakra-affirmation">
                <span className="chakra-affirmation__label">Affirmation</span>
                <span className="chakra-affirmation__text">
                  “{currentChakra.shortAffirmation}”
                </span>
              </p>

              <div className="chakra-themes" aria-label="Chakra themes">
                {currentChakra.themes.map((theme) => (
                  <span key={theme} className="chakra-theme-pill">
                    {theme}
                  </span>
                ))}
              </div>

              <div className="chakra-controls">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handlePlayPause}
                  aria-pressed={isPlaying}
                >
                  {isPlaying ? 'Pause tone' : 'Play tone'}
                </button>

                <div className="chakra-controls__secondary">
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={handleNext}
                    disabled={currentIndex === chakraCount - 1}
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="chakra-auto">
                <label className="chakra-auto__toggle">
                  <input
                    type="checkbox"
                    checked={autoAdvance}
                    onChange={handleToggleAuto}
                  />
                  <span className="chakra-auto__label">
                    Auto journey ({currentChakra.recommendedDurationSeconds}s)
                  </span>
                </label>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

