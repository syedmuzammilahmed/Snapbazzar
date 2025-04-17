export default function Products({ params }) {
    const { subcategory } = params;
  
    return (
      <div>
        <h1>{subcategory}</h1>
        <p>Welcome to {subcategory}!</p>
      </div>
    );
  }
  