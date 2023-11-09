using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TesteViceriSeidor.Api.Models
{
    public class Superpoder
    {
        [Key]
        public int? Id { get; set; }

        [MaxLength(50)]
        [Column("Superpoder")]
        public string Nome { get; set; }

        [MaxLength(250)]
        public string Descricao { get; set; }

        public IEnumerable<Heroi> Herois { get; set; }

        public Superpoder() : this("", "")
        {
        }

        public Superpoder(string Nome, string Descricao)
        {
            this.Id = null;
            this.Nome = Nome;
            this.Descricao = Descricao;
            this.Herois = new List<Heroi>();
        }
    }
}
