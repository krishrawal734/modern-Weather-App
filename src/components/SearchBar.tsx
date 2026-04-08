import { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onGeolocate: () => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, onGeolocate, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full h-12 pl-11 pr-4 rounded-xl bg-card border border-border text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="h-12 px-5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        Search
      </button>
      <button
        type="button"
        onClick={onGeolocate}
        disabled={isLoading}
        className="h-12 px-4 rounded-xl glass-subtle text-foreground hover:opacity-80 transition-opacity disabled:opacity-50 flex items-center gap-2 text-sm"
        title="Use my location"
      >
        <MapPin className="h-4 w-4" />
      </button>
    </form>
  );
};

export default SearchBar;
