from queries.pool import pool


class TagsQueries:
    def get_tags(self):
        # connect the db
        with pool.connection() as conn:
            # get a cursor to run SQL
            with conn.cursor() as cur:
                tags_data = cur.execute(
                    """
                        SELECT *
                        FROM tags
                        """
                )
                tags = []
                for tag in tags_data.fetchall():
                    tags.append(tag[0])
                return tags
