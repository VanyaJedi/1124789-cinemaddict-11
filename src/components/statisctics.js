export const createStatisticsTemplate = (films) => {
  return (
    ` <section class="footer__statistics">
        <p>${films.length} movies inside</p>
      </section>
    `
  );
};
