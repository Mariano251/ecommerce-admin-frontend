import { Star } from 'lucide-react';

interface ReviewStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  readonly?: boolean;
  onRatingChange?: (rating: number) => void;
}

export default function ReviewStars({
  rating,
  maxRating = 5,
  size = 20,
  readonly = true,
  onRatingChange
}: ReviewStarsProps) {
  const handleStarClick = (starIndex: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      alignItems: 'center'
    }}>
      {Array.from({ length: maxRating }, (_, index) => {
        const isFilled = index < Math.floor(rating);
        const isHalfFilled = index < rating && index >= Math.floor(rating);

        return (
          <div
            key={index}
            onClick={() => handleStarClick(index)}
            style={{
              cursor: readonly ? 'default' : 'pointer',
              position: 'relative',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!readonly) {
                const target = e.currentTarget as HTMLElement;
                target.style.transform = 'scale(1.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!readonly) {
                const target = e.currentTarget as HTMLElement;
                target.style.transform = 'scale(1)';
              }
            }}
          >
            {isHalfFilled ? (
              // Half star (using gradient)
              <div style={{ position: 'relative' }}>
                <Star
                  size={size}
                  color="#F59E0B"
                  fill="none"
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '50%',
                  overflow: 'hidden'
                }}>
                  <Star
                    size={size}
                    color="#F59E0B"
                    fill="#F59E0B"
                  />
                </div>
              </div>
            ) : (
              // Full or empty star
              <Star
                size={size}
                color={isFilled ? '#F59E0B' : '#6B7280'}
                fill={isFilled ? '#F59E0B' : 'none'}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}