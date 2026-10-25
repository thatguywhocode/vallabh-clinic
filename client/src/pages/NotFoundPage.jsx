import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="py-24 sm:py-32">
      <Container size="narrow">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-botanical-100 text-botanical-600 flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-vermilion-500 font-semibold font-sans">
            404 — Page Not Found
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-botanical-900">
            Path Not Located
          </h1>
          <p className="text-earth-600 font-sans max-w-md mx-auto text-sm sm:text-base">
            The page or clinical resource you are seeking could not be found. Please return to our clinical home.
          </p>
          <div className="pt-4">
            <Link to="/">
              <Button variant="primary" icon={ArrowLeft} iconPosition="left">
                Return to Clinic Home
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
